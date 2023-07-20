import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../../model/ReceiptModel';
import ParticipantModel from '../../../../model/ParticipantModel';
import Topbar from '../../../../components/Topbar';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import HomeTile from './HomeTile';
import { updateParticipantDeclaration } from '../MyDetail/service';
import { newId } from '../../../../events/MessageService';
import AddSpinnerCommand from '../../../../events/AddSpinnerCommand';
import RemoveSpinnerCommand from '../../../../events/RemoveSpinnerCommand';
// import mapImage from '../../../../assets/map.png';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const HomeSection = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const params: { eventId: string; participantReferenceId: string } =
    useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);

  const [state, setState] = useState<any>({});

  const goToCreateParticipantPage = () => {
    navigate(`/${props.space}/participant/new`);
  };

  const goToCompanyPage = (participantId: string) => {
    navigate(`/${props.space}/participant/${participantId}`);
  };

  const handleChange = (participant: any) => {
    setState({
      ...state,
      [participant.currentTarget.name]: participant.currentTarget.value,
    });
  };

  const save = (event: any) => {
    event.preventDefault();
    console.log(state);
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

  const updateDeclaration = (event: any, value?: boolean) => {
    const spinnerId = newId();
    AddSpinnerCommand.next(spinnerId);
    updateParticipantDeclaration(
      props.space,
      props.event._id,
      props.participant._id,
      event.currentTarget.name,
      value ? 'N' : 'Y'
    ).then((response: any) => {
      RemoveSpinnerCommand.next(spinnerId);
      refreshData();
    });
  };

  const homeList = JSON.parse(props.event.home);

  return (
    <div className="home-section">
      {homeList.map((media: any) => (
        <>
          {(!media.colorMode ||
            profile.theme === `theme_${media.colorMode}`) && (
            <HomeTile key={media.title} content={media} />
          )}
        </>
      ))}
      <div className="home-section__declaration">
        <div className="home-section__declaration__item">
          <input
            type="checkbox"
            id="first"
            name="first"
            value="first"
            checked={props.participant.firstDeclaration}
            onInput={(event) =>
              updateDeclaration(event, props.participant.firstDeclaration)
            }
          />
          <label htmlFor="first">
            I hereby confirm that my COVID test taken within a day before travel
            was NEGATIVE.
          </label>
        </div>
        <div className="home-section__declaration__item">
          <input
            type="checkbox"
            id="second"
            name="second"
            value="second"
            checked={props.participant.secondDeclaration}
            onInput={(event) =>
              updateDeclaration(event, props.participant.secondDeclaration)
            }
          />
          <label htmlFor="second">
            I hereby confirm that my second COVID test taken upon arrival at the
            hotel was NEGATIVE (test kits provided by Val, Ineke, Janina or in
            the Grand Ocean Terrace Ballroom).
          </label>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
