import React, { useEffect, useState } from 'react';
import ReferralsQuest from './ReferralsQuest/ReferralsQuest';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import SurveyQuest from './SurveyQuest/SurveyQuest';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import NdugesServeyQuestOverlay from '../Common/NdugesServeyQuestOverlay';
import SurveyQuestion from './SurveyQuest/SurveyQuestion/SurveyQuestion';
import QuestionModal from './SurveyQuest/SurveyQuestion/QuestionModal';
import SuccessScreenWihoutReward from './SurveyQuest/SurveyQuestion/SuccessScreen/SuccessScreenWihoutReward';
import UserHabitQuest from './UserHabitQuest/UserHabitQuest';
import PlayZoneSvgIcon from '../../assets/image/SVG/PlayZone/PlayZone';
import PlayZoneHeader from './PlayZoneHeader/PlayZoneHeader';

const PlayZone = ({ width = '100%',maxWidth='375px',height='420px' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userHabitQuest, setUserHabitQuest] = useState([]);
  const [serveyQuest, setServeyQuest] = useState([]);
  const [referralQuest, setReferralQuest] = useState([]);
  const [nodgesType,setNodgesType]=useState(null)
  const [showAll, setShowAll] = useState(false); // State to track whether to show all quests
  const { email, token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);
  const [isServeyClicked, setIsServeyGoClicked] = useState(false);
  const [nudgesClicked,setNudgesClicked]=useState(false)
  const [questId, setQuestId] = useState(null);
  const [reward,setReward]=useState(null);
  const [typeOfQuest,setTypeOfQuest]=useState(null)
  const [completeSurveyQuestion,setCompleteSurveyQuestion]=useState(false)
  const [isFinisedClickedServey,setIsFinisedClickedServey]=useState(null)
  const [isAnswerIsCompleted,setIsAnswerIsCompleted]=useState(false)
  
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

  const OnCloseServeyOverlay = () => {
    setIsFinisedClickedServey(false)
  }

  return (
    <div className='playZone-overlay'>
      <div className={`playZone-modal ${isServeyClicked ? 'no-padding' : ''}`}
        style={{ width,maxWidth}}
      > 
      {isAnswerIsCompleted && <QuestionModal text="You already play the quest" onClose={()=>setIsAnswerIsCompleted(false)}/>}
      {isFinisedClickedServey &&  <NdugesServeyQuestOverlay   OnCloseServeyOverlay={OnCloseServeyOverlay} />}
      {isServeyClicked && <SurveyQuestion
        setCompleteSurveyQuestion={setCompleteSurveyQuestion} 
        onClose={() => setIsServeyGoClicked(false)} 
        setIsFinisedClickedServey={setIsFinisedClickedServey}
        isFinisedClickedServey={isFinisedClickedServey}
        questId={questId}
      />}
        {nudgesClicked && <SuccessScreenWihoutReward onClose={()=>setNudgesClicked(false)} nodgesType={nodgesType} />}
         {!isServeyClicked && !nudgesClicked && !isFinisedClickedServey && <>
        <div className="top-card"
          style={{
            backgroundColor:'#9a7eff',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding:'20px',
            width,
            maxWidth,
            height
          }}
        > 
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <div
              dangerouslySetInnerHTML={{ __html: PlayZoneSvgIcon.hideButton }}
              className='playZone-close-btn' 
              onClick={handleCloseModal}
            />
          </div>
        <PlayZoneHeader/>
        </div> 

        {/* <div className='playZone-cards'>
          <div className='playZone-quest-see'>
            <div>
              <span style={{ fontWeight: '500', fontSize: '20px' }}>Quest </span> 
              <span style={{ fontWeight: '500', fontSize: '20px',color: 'rgba(6, 24, 44, 0.8)' }}>
                ({allQuests.length})
              </span>
            </div>
            <span className='playZone-see' onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show less' : 'See all'}
            </span>
          </div>

          {displayedQuests.filter(quest => quest.questCategory === 'User Habit Quest').length > 0 && 
            <UserHabitQuest 
              userHabitQuest={displayedQuests.filter(quest => quest.questCategory === 'User Habit Quest')} 
              setNudgesClicked={setNudgesClicked}
              setNodgesType={setNodgesType}
              setTypeOfQuest={setTypeOfQuest}
            />
          }

          {displayedQuests.filter(quest => quest.questCategory === 'Survey Quest').length > 0 && 
            <SurveyQuest 
              serveyQuest={displayedQuests.filter(quest => quest.questCategory === 'Survey Quest')} 
              setIsServeyGoClicked={setIsServeyGoClicked}
              setQuestId={setQuestId}
              setReward={setReward}
              isAnswerIsCompleted={isAnswerIsCompleted} 
              setIsAnswerIsCompleted={setIsAnswerIsCompleted} 
            />
          }

          {displayedQuests.filter(quest => quest.questCategory === 'Referral Quest').length > 0 && 
            <ReferralsQuest
             referralQuest={displayedQuests.filter(quest => quest.questCategory === 'Referral Quest')}
             setNudgesClicked={setNudgesClicked}
             setNodgesType={setNodgesType}
             setTypeOfQuest={setTypeOfQuest}
             
             />
          }

          <LeaderBoard  />
        </div> */}
        </>}
      </div>
    </div>
  );
};

export default PlayZone;
