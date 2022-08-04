import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Compose from '../../../../components/Compose';
import { useSelector } from 'react-redux';
import { getFeedsBySpace, sendFeed } from './service';
import FeedModel from 'src/model/FeedModel';
import { useParams } from 'react-router';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const NewsFeed = (props: Props) => {
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

  useEffect(() => {
    fetchFeedsData();
  }, []);

  const params: {
    eventId: string;
    participantReferenceId: string;
  } = useParams();

  console.log(params);

  const fetchFeedsData = () => {
    console.log(authorization);
    getFeedsBySpace(props.space, authorization, params.eventId).then(
      (response: FeedModel[]) => {
        setavailableFeeds(response);
      }
    );
  };

  const handleChange = (text: string) => {
    console.log(text);
    sendFeed(
      props.space,
      { ...state, eventId: params.eventId, description: text },
      authorization
    ).then((response: any) => {
      fetchFeedsData();
      console.log(response);
    });
  };

  const messageList = [
    {
      _id: '62eb6c39aa6aa7563097a4ff',
      description: 'hello',
      sender: '',
      eventId: '',
      userId: '',
      createdAt: '2022-08-04T06:50:33.592Z',
      updatedAt: '2022-08-04T06:50:33.592Z',
    },
    {
      _id: '62eb6c66aa6aa7563097a550',
      description: 'new',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      userId: '',
      createdAt: '2022-08-04T06:51:18.917Z',
      updatedAt: '2022-08-04T06:51:18.917Z',
    },
    {
      _id: '62eb6cb8aa6aa7563097a57e',
      description: 'admin',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      userId: '',
      createdAt: '2022-08-04T06:52:40.739Z',
      updatedAt: '2022-08-04T06:52:40.739Z',
    },
    {
      _id: '62eb78efd2e52777d4f54447',
      important: false,
      description: 'test feed',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      admin: false,
      userId: '',
      createdAt: '2022-08-04T07:44:47.927Z',
      updatedAt: '2022-08-04T07:44:47.927Z',
    },
    {
      _id: '62eb7cc7d2e52777d4f546a5',
      important: false,
      description: 'admin false',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      admin: true,
      userId: '',
      createdAt: '2022-08-04T08:01:11.988Z',
      updatedAt: '2022-08-04T08:01:11.988Z',
    },
    {
      _id: '62ebae64d2e52777d4f54b6a',
      important: false,
      description:
        'Soluta occaecati architecto non sunt perspiciatis nesciunt eum maxime voluptatum labore voluptatibus dolore',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      admin: false,
      userId: '',
      createdAt: '2022-08-04T11:32:52.790Z',
      updatedAt: '2022-08-04T11:32:52.790Z',
    },
    {
      _id: '62ebaea7d2e52777d4f54b7d',
      important: false,
      description:
        'Delectus alias est sequi a laborum non voluptatem harum explicabo sapiente eum reprehenderit facere similique',
      sender: '',
      eventId: '62d7a28b2e23c6ba23eef4b2',
      admin: true,
      userId: '',
      createdAt: '2022-08-04T11:33:59.895Z',
      updatedAt: '2022-08-04T11:33:59.895Z',
    },
  ];

  return (
    <div className="news-feed">
      {messageList.map((item: any) => (
        <div
          className={`news-feed__item ${item.admin ? 'admin' : 'user'}`}
          key={item._id}
        >
          {item.description}
        </div>
      ))}
      <Compose handleChange={handleChange} />
    </div>
  );
};

export default NewsFeed;
