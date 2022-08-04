import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCheck,
  faCircleExclamation,
  faClose,
  faPaperPlane,
  faPen,
  faPlus,
  faTimes,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../model/ReceiptModel';
import TrackModel from '../../model/TrackModel';
import Topbar from '../../components/Topbar';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import EventModel from '../../model/EventModel';
import { formatDateTimeText } from '../Lib/DateUtils';
import FeedModel from 'src/model/FeedModel';
import { getFeedsBySpace, sendFeed } from './service';
import { initial } from 'lodash';

const queryString = require('query-string');

interface Props {
  space: string;
  eventId?: string | null;
}

const FeedList = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const [availableFeeds, setavailableFeeds] = useState<FeedModel[]>([]);

  let [state, setState] = useState<FeedModel>({
    important: false,
    description: '',
    sender: '',
    eventId: '',
    admin: false,
    userId: '',
  });

  const initialState = {
    important: false,
    description: '',
    sender: '',
    eventId: '',
    admin: false,
    userId: '',
  };

  const fetchFeedsData = () => {
    getFeedsBySpace(props.space, authorization).then(
      (response: FeedModel[]) => {
        setavailableFeeds(response);
      }
    );
  };

  useEffect(() => {
    fetchFeedsData();
    DisableContextBarCommand.next(true);
  }, []);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const toggleChange = (event: any) => {
    console.log(event.target.checked);
    setState({ ...state, important: event.target.checked });
  };

  const send = (event: any) => {
    event.preventDefault();
    console.log(state);
    sendFeed(
      props.space,
      { ...state, eventId: props.eventId, admin: true },
      authorization
    ).then((response: any) => {
      fetchFeedsData();
      console.log(response);
    });
  };

  const clear = () => {
    setState(initialState);
  };

  return (
    <>
      <div className="create-feed">
        <div>
          <label>Description</label>
          <input
            name="description"
            onInput={handleChange}
            value={state.description}
          />
        </div>
        <div>
          <label htmlFor="important">Important</label>
          <input
            type="checkbox"
            id="important"
            name="important"
            checked={state.important}
            onChange={toggleChange}
          />
        </div>
        <div>
          <button className="button primary-button" onClick={send}>
            <FontAwesomeIcon icon={faPaperPlane} />
            Send
          </button>
        </div>
        <div>
          <button className="button default-button" onClick={clear}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <div className="feed-list">
        <>Feed (priority, description, sender, eventId)</>
        <div className="feed-list__main">
          {availableFeeds.map((item: FeedModel) => (
            <button className="button feed-list__main__item" key={item._id}>
              <div className="feed-list__main__item__left">
                <div className="feed-list__main__item__left__name">
                  {item.description}
                </div>
                <div className="feed-list__main__item__left__description">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedList;
