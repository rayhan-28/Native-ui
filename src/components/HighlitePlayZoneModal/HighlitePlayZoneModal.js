import React, { useEffect, useState } from 'react';
import HighliteReferralsQuestCard from './HighliteReferralsQuestCard/HighliteReferralsQuestCard';
import HighliteActionQuestCard from './HighliteActionQuestCard/HighliteActionQuestCard';
import svgIcons from '../../assets/image/SVG/svg';
import HighliteLeaderboardCard from './HighliteLeaderboardCard/HighliteLeaderboardCard';
import HighliteServeyQuestCard from './HighliteServeyQuestCard/HighliteServeyQuestCard';
import SliderLevel from './ArcadeCard/SliderLevel';
import CommonCardOne from './CommonCardOne/CommonCardOne';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Servey from '../Servey/Servey';

const HighlitePlayZoneModal = ({ width = '550px' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userHabitQuest, setUserHabitQuest] = useState([]);
  const [serveyQuest, setServeyQuest] = useState([]);
  const [referralQuest, setReferralQuest] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to track whether to show all quests
  const { email, token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);
  const [isGoClicked, setIsGoClicked] = useState(false);
  const [questId, setQuestId] = useState(null);
  const [reward,setReward]=useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev.api.pitch.space/api/quest-for-arcade', {
          params: { email, token }
        });

        if (response.status === 200) {
          const quests = response.data.data; // Assuming the data is stored in `data`
          
          // Filter quests based on questCategory
          const serveyQuests = quests.filter(quest => quest.questCategory === 'Survey Quest');
          const userHabitQuests = quests.filter(quest => quest.questCategory === 'User Habit Quest');
          const referralQuests = quests.filter(quest => quest.questCategory === 'Referral Quest');
          
          // Update state for each category
          setServeyQuest(serveyQuests);
          setUserHabitQuest(userHabitQuests);
          setReferralQuest(referralQuests);
        }
      } catch (err) {
        setError('You are not valid');
      }
    };

    if (email && token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [email, token]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Limit the number of quests to show by default
  const MAX_DISPLAY_QUESTS = 6;

  // Merge all quests into one array and limit if showAll is false
  const allQuests = [...userHabitQuest, ...serveyQuest, ...referralQuest];
  const displayedQuests = showAll ? allQuests : allQuests.slice(0, MAX_DISPLAY_QUESTS);

  if (!isOpen) return null;

  return (
    <div className='highlite-modal-overlay'>
      <div className={`highlite-modal ${isGoClicked ? 'no-padding' : ''}`}
        style={{ width: width}}
      >
        {isGoClicked && <Servey  onClose={() => setIsGoClicked(false)} questId={questId}/>}
         {!isGoClicked && <>
        <div className="top-card"
          style={{
            backgroundColor:'#9a7eff',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding:'20px'
          }}
        > 
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <div
              dangerouslySetInnerHTML={{ __html: svgIcons.hideButton }}
              className='highlite-close-btn' 
              onClick={handleCloseModal}
            />
          </div>
          <SliderLevel />
        </div> 

        <div className='highlite-cards'>
          <div className='quest-see'>
            <div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Quest </span> 
              <span style={{ color: 'rgba(6, 24, 44, 0.8)' }}>
                ({allQuests.length})
              </span>
            </div>
            <span className='see' onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show less' : 'See all'}
            </span>
          </div>

          {/* Render User Habit Quest cards */}
          {displayedQuests.filter(quest => quest.questCategory === 'User Habit Quest').length > 0 && 
            <CommonCardOne userHabitQuest={displayedQuests.filter(quest => quest.questCategory === 'User Habit Quest')} />
          }

          {/* Render Survey Quest cards */}
          {displayedQuests.filter(quest => quest.questCategory === 'Survey Quest').length > 0 && 
            <HighliteServeyQuestCard 
              serveyQuest={displayedQuests.filter(quest => quest.questCategory === 'Survey Quest')} 
              setIsGoClicked={setIsGoClicked}
              setQuestId={setQuestId}
              setReward={setReward}
            />
          }

          {/* Render Referral Quest cards */}
          {displayedQuests.filter(quest => quest.questCategory === 'Referral Quest').length > 0 && 
            <HighliteReferralsQuestCard referralQuest={displayedQuests.filter(quest => quest.questCategory === 'Referral Quest')} />
          }

          {/* Render Action Quest and Leaderboard components */}
          <HighliteActionQuestCard />
          <HighliteLeaderboardCard />
        </div>
        </>}
      </div>
    </div>
  );
};

export default HighlitePlayZoneModal;
