import { Button, Checkbox, Label, Modal, TextInput, FileInput    } from 'flowbite-react';
import { useState } from 'react';
export  function ModalCustom() {
    const [openModal, setOpenModal] = useState();
    const [parent, setParent] = useState("");
    const [file,setFile] = useState(null)
    const props = { openModal, setOpenModal };
    const handleAdd = async ()=>{
        try {
            if (!file || !parent) {
                alert("Please fill all the fields")
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('parent',parent)
            const response =await fetch("/pdf/",{
                method:"POST",
                body:formData
            })
            console.log(response);
          setOpenModal(undefined)
          alert("added pdf")
        } catch (error) {
            setOpenModal(undefined)
            alert("error while uploading pdf")
            console.log(error);
        }
    }
    return (
        <>
            <Button onClick={() => props.setOpenModal('form-elements')}>Add Doc</Button>
            <Modal className='dark' show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body className=''>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add new Document</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="parent" value="Parent" />
                            </div>
                            <TextInput id="email" onChange={(e)=>setParent(e.target.value)} placeholder="Parent Document" required />
                        </div>

                        <div
                            className="max-w-md"
                            id="fileUpload"
                        >
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="file"
                                    value="Upload file"
                                />
                            </div>
                            <FileInput
                                helperText="A Pdf document"
                                id="file"
                                accept='.pdf'
                                onChange={(e)=>{
                                    setFile(e.target.files[0])
                                }}
                            />
                        </div>
                        
                        <div className="w-full">
                            <Button onClick={handleAdd}>Add file</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


