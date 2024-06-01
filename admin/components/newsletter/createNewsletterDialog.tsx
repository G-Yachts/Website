"use client";

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNewsletter } from "@/actions/newsletter";
import { useState } from "react";
import { NewsletterI } from "@/types/newsletter";

export const CreateNewsletterDialog = ({
    createModalOpen,
    setCreateModalOpen,
    onCreateNewsletter,
}: {
    createModalOpen: boolean;
    setCreateModalOpen: (open: boolean) => void;
    onCreateNewsletter: VoidFunction;
}) => {
    const [creating, setCreating] = useState<boolean>(false);
    const toggleCreating = () => setCreating(!creating);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<NewsletterI>();

    const onSubmit: SubmitHandler<NewsletterI> = async (data) => {
        try {
            toggleCreating();
            await createNewsletter(data);
        } catch (error) {
            console.error("Failed to create newsletter:", error);
        } finally {
            toggleCreating();
            setCreateModalOpen(false);
            onCreateNewsletter();
        }
    }

    return (
        <Modal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create new newsletter template
                        </ModalHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody>
                                <Input
                                    label="Title"
                                    {...register("title", { required: true })}
                                    errorMessage={errors.title ? "This field is required" : ""}
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="mt-4" htmlFor="htmlContent">HTML Content</label>
                                    <Textarea
                                        {...register("htmlContent", { required: true })}
                                        label="HTML content..."
                                        style={{ width: "700px", height: "350px" }}
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={creating} type="submit" color="primary">
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
