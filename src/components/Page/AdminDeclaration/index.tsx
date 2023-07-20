import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCheck,
  faPen,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ParticipantModel from '../../../model/ParticipantModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';
import { getEventById, getParticipantList } from '../CheckinPage/service';

interface Props {
  space: string;
  eventId?: string | null;
}

const AdminDeclaration = (props: Props) => {
  const [participantList, setParticipantList] = useState<ParticipantModel[]>(
    []
  );
  const [event, setEvent] = useState<any>();
  const params: any = useParams();

  const [validationSuccessful, setValidationSuccessful] = useState(false);
  const [declareCount, setDeclareCount] = useState<any>();
  const [declare, setDeclare] = useState<boolean>(false);
  const [notDeclare, setNotDeclare] = useState<boolean>(false);

  useEffect(() => {
    fetchEventData();
    getParticipantList(props.space, params.eventId).then(
      (response: ParticipantModel[]) => {
        setParticipantList(response);
      }
    );
  }, []);

  useEffect(() => {
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setValidationSuccessful(response?.adminKey === params.code);
    });
  }, [params]);

  const fetchEventData = () => {
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setEvent(response);
    });
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const handleDeclare = () => {
    setDeclare(!declare);
    // const list = participantList.filter((item) => {
    //   console.log(item.referenceId);
    //   item.firstDeclaration && item.secondDeclaration;
    // });
    // setDeclareCount(list);
    // console.log(list, declareCount);
  };

  return (
    <>
      <Topbar
        title={`Declaration - 
        ${params.declarationType === 'before' ? 'Before Travel' : ''}
        ${params.declarationType === 'after' ? 'After Travel' : ''}`}
      />
      {event?.notification && (
        <div className="checkin-page__notification">{event.notification}</div>
      )}
      {validationSuccessful && (
        <div className="participant-list">
          <div className="participant-list__main">
            {participantList
              .filter(
                (item: ParticipantModel) =>
                  (declare && notDeclare) ||
                  (!declare && !notDeclare) ||
                  (declare &&
                    (params.declarationType === 'before'
                      ? item.firstDeclaration
                      : item.secondDeclaration)) ||
                  (notDeclare &&
                    (params.declarationType === 'before'
                      ? !item.firstDeclaration
                      : !item.secondDeclaration))
              )
              .map((item: ParticipantModel) => (
                <button
                  className="button participant-list__main__item"
                  key={item._id}
                >
                  <div className="participant-list__main__item__name">
                    {`${item.firstName} ${item.lastName}`}
                    <div
                      className={`declare-list__indicator ${
                        item.firstDeclaration
                          ? 'declare-list__indicator--declared'
                          : 'declare-list__indicator--not-declared'
                      } `}
                    />
                    <div
                      className={`declare-list__indicator ${
                        item.secondDeclaration
                          ? 'declare-list__indicator--declared'
                          : 'declare-list__indicator--not-declared'
                      } `}
                    />
                  </div>
                </button>
              ))}
          </div>

          <div className="declare-list">
            <button
              className={`button declare ${declare ? 'active' : ''}`}
              onClick={() => handleDeclare()}
            >
              <div className="declare-list__text">
                Declared
                {/* <span className="declare-list__count">
                  {participantList.length - declareCount}
                </span> */}
              </div>
            </button>
            <button
              className={`button declare ${notDeclare ? 'active' : ''}`}
              onClick={() => setNotDeclare(!notDeclare)}
            >
              <div className="declare-list__text">
                Not Declared
                {/* <span className="declare-list__count">
                  {participantList.length}
                </span> */}
              </div>
            </button>
          </div>
        </div>
      )}
      {!validationSuccessful && <div>Unauthorized</div>}
    </>
  );
};

export default AdminDeclaration;
