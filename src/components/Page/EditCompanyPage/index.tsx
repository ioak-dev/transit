import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import CompanyModel from '../../../model/CompanyModel';
import { saveCompany } from './service';

interface Props {
  history: any;
  location: any;
}

const EMPTY_COMPANY: CompanyModel = {
  _id: undefined,
  name: '',
  description: '',
  reference: null,
};

const EditCompanyPage = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<CompanyModel>({ ...EMPTY_COMPANY });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const save = () => {
    saveCompany(state, authorization).then((response: any) => {
      goBack();
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-company-page">
      <Topbar title={searchParams.has('id') ? 'Edit company' : 'New company'}>
        right
      </Topbar>
      <div className="edit-company-page__main main-section content-section page-width">
        <form onSubmit={save}>
          <div className="form">
            <div className="form-two-column">
              <div>
                <label>Name</label>
                <input
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </div>
              <div>
                <label>Reference</label>
                <input
                  name="reference"
                  value={state.reference || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div>
              <label>Description</label>
              <input
                name="description"
                value={state.description}
                onChange={handleChange}
                type="textarea"
                required
              />
            </div>
          </div>
        </form>
      </div>
      <div className="footer">
        <div />
        <div className="footer-right">
          <button type="submit" onClick={save}>
            <FontAwesomeIcon icon={faCheck} />
            {searchParams.has('id') ? 'Save' : 'Save and go back'}
          </button>
          <button onClick={goBack}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPage;
