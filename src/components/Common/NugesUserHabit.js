import React from "react";
import UserHabitNudgesSvgIcon from "../../assets/image/SVG/UserHabitNudges/UserHabitNudges";

const NugesUserHabib = ({
  streakAway,
  rewardAway,
  fromPlayer,
  setUserHabitNuggesOverlay,
}) => {
  const handleClicked = () => {
    setUserHabitNuggesOverlay(true)
  };
  return (
    <div style={{backgroundColor:fromPlayer?'rgba(167, 159, 159, 0.1) ':'rgba(255, 255, 255, 0.3)' }} className="Nudges-quest">
      <div className="icon-text-quest">
        {streakAway === 1 ? (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: UserHabitNudgesSvgIcon.letsGo,
              }}
            />
            <p className="text-ellipsis">Your last chance to save your streak</p>
          </>
        ) : streakAway > 1 ? (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: UserHabitNudgesSvgIcon.letsGo,
              }}
            />
            <p className="text-ellipsis">You’re {streakAway} step away from a streak...</p>
          </>
        ) : streakAway === 0 && rewardAway > 0 ? (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: UserHabitNudgesSvgIcon.letsGo,
              }}
            />
            <p className="text-ellipsis">You’re {rewardAway} streaks away from a reward...</p>
          </>
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: UserHabitNudgesSvgIcon.wow_small,
              }}
            />
            <p className="text-ellipsis">Congrats! You unlocked a reward...</p>
          </>
        )}
      </div>
      <div onClick={() => handleClicked()} className="arrow-box">
        <div
          dangerouslySetInnerHTML={{
            __html: UserHabitNudgesSvgIcon.right_quest_arrow,
          }}
        />
      </div>
    </div>
  );
};

export default NugesUserHabib;
