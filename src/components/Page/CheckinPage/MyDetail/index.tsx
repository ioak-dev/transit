import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../../model/ReceiptModel';
import ParticipantModel from '../../../../model/ParticipantModel';
import Topbar from '../../../../components/Topbar';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import { fetchAndSetParticipantItems } from '../../../../actions/ParticipantActions';
import EventModel from '../../../../model/EventModel';
import moment from 'moment';
import { updateParticipantDeclaration } from './service';
import {
  formatDate,
  formatDateText,
  formatDateTimeText,
} from '../../../../components/Lib/DateUtils';
import CustomField from './CustomField';
// import mapImage from '../../../../assets/map.png';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const MyDetail = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const params: { eventId: string; participantReferenceId: string } =
    useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);

  const [state, setState] = useState<any>({});

  const goToCreateParticipantPage = () => {
    history.push(`/${props.space}/participant/new`);
  };

  const goToCompanyPage = (participantId: string) => {
    history.push(`/${props.space}/participant/${participantId}`);
  };

  const handleChange = (participant: any) => {
    setState({
      ...state,
      [participant.currentTarget.name]: participant.currentTarget.value,
    });
  };

  const toggleShowAllTracks = () => {
    setShowAllTracks(!showAllTracks);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const refreshData = () => {
    props.handleChange();
  };

  const customFields = JSON.parse(props.event.customFields);

  return (
    <div className="my-detail">
      <div className="my-detail__item">
        <div className="my-detail__item__label">Name</div>
        <div>{`${props.participant.firstName} ${props.participant.lastName}`}</div>
      </div>
      <div className="my-detail__item">
        <div className="my-detail__item__label">e-mail</div>
        <div>{props.participant.email || '-'}</div>
      </div>
      {/* <div className="my-detail__item">
        <div className="my-detail__item__label">Birth date</div>
        <div>
          {props.participant.birthDate
            ? formatDateText(props.participant.birthDate)
            : '-'}
        </div>
      </div> */}
      {customFields?.map((customField: any) => (
        <CustomField
          customField={customField}
          key={customField.name}
          participant={props.participant}
        />
      ))}
    </div>
  );
};

export default MyDetail;
