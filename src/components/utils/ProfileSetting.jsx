import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Dialog,
  TextField,
  Spinner,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useProfileUpdateMutation } from "../../services/api";
import { setUser } from "../../slices/authSlice";
import { useRef } from "react";

export default function ProfileSetting() {
  const { user } = useSelector((state) => state.auth);

  const imagePreviewRef = useRef();
  const [profileUpate, { isLoading }] = useProfileUpdateMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      formData.append("username", data.username);
      const response = await profileUpate(formData).unwrap();
      dispatch(setUser(response.data.user));
    } catch (error) {
      if (error.data?.status == 400) {
        error.data?.errors?.map((error) => {
          setError(error.field, {
            type: "manual",
            message: error.message,
          });
        });
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex className="items-center space-x-4">
          <Avatar fallback={user.username[0]} src={user.avatar} size="2" />
          <Text className="font-bold">{user.username}</Text>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title className="manrope-bold">Edit Profile</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="row" align="center" gap="4">
            <Box className="relative my-8">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="relative rounded"
                  ref={imagePreviewRef}
                  style={{
                    objectFit: "cover",
                    width: "50px",
                    height: "50px",
                  }}
                  src={user.avatar}
                  alt={user.username}
                  width="50"
                  height="50"
                />
                <Pencil2Icon className="absolute bottom-0 right-0" />
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                {...register("avatar", {
                  onChange: (event) => {
                    const file = event.target.files[0];
                    if (file) {
                      imagePreviewRef.current.src = URL.createObjectURL(file);
                      return file;
                    }
                  },
                })}
              />
            </Box>
            <Box className="flex-1">
              <Text asChild size="2">
                <label htmlFor="username">Username</label>
              </Text>
              <TextField.Root
                id="username"
                placeholder="Username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Please provide your username",
                  },
                })}
              ></TextField.Root>
              <Text color="crimson" size="2">
                {errors.username?.message}
              </Text>
            </Box>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" className="cursor-pointer">
                Cancel
              </Button>
            </Dialog.Close>
            <Button disabled={isLoading} className="cursor-pointer">
              {isLoading && <Spinner />}
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
