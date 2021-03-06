import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Button } from '../../atoms';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { contentAsync } from '@internship/store/authentication';

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
`;

const StyledTextarea = styled.textarea`
  height: 100%;
  width: 100%;
`;
type ContentFormProps = {
  setClose;
  topicName;
  topicId;
};
export const ContentForm: React.FC<ContentFormProps> = ({ setClose, topicName, topicId }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const onSubmit = (values) => {
    values = { ...values, topicId };
    dispatch(contentAsync.request(values));
    setClose(false);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setClose(false);
  };

  return (
    <Modal show={show} onHide={() => handleClose()} keyboard={false}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{topicName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledRow>
            <div className="col-4 mt-2 ml-n2">
              <label>içerik: </label>
            </div>
            <div className="col-8 ml-sm-2">
              <StyledTextarea placeholder="İçeriği giriniz" name="content"
                              ref={register({ required: true })} />
            </div>
          </StyledRow>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
