import { FormCheck } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef } from 'react';


function HideModal() {
    const checkRef = useRef<HTMLInputElement>(null);

    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        if (checkRef.current?.checked) {
            document.cookie = "hidePopup=true; path=/; max-age=2147483647";
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <p>Due to the server being a free app on <a href="https://www.render.com" target='_blank'>Render.com</a>, initial load times maybe be 50+ seconds.</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    {/* uncontrolled is ok here */}
                    <FormCheck ref={checkRef} defaultChecked={false} type="checkbox" label="Don't show this message again. (Uses cookies)" />
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HideModal;