import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
export default function App({contentButton,title, content,style}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleActionClick = async () => {
    setLoading(true);
    // Simulate a delay for the async action (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    alert(`Action ${contentButton} completed!`);
  };
  return (
    <div className="w-full">
      <Button className={style} onPress={onOpen}>{contentButton}</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="bg-white border-[2px] rounded-xl border-slate-500">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
               {title}
              </ModalHeader>
              <ModalBody>
                <p>
                  {content}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  className="border-[2px] border-red-400 text-red-500 bg-white"
                  onPress={onClose}
                >
                  Close
                </Button>
                {loading ? (
                  <Button
                    isLoading
                    className="bg-blue-500 text-white font-bold"
                    color="secondary"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Loading
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="border-[2px] border-green-400 bg-green-200 text-green-500 "
                    onPress={() => {
                      handleActionClick().then(onClose);
                    }}
                  >
                    Action
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
