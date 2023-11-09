import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achieve from './Achieve.jsx'

// CHILD OF USER PARENT OF ACHIEVE
//POSSIBLY ADD ANIMATION ON TRIGGERING ACHIEVEMENT
// Access the user who is currently logged in to get information from the database about them
// then check if user account has achievements. if so render to page
function Achievements(props) { //access props.user to get id for subsequent get requests
  // const [userList, setUserList] = useState([]);
  // const [userObj, setUserObj] = useState({})
  const [achievementsEarned, setAchievementsEarned] = useState([]);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const _id  = JSON.parse(sessionStorage.getItem('user'))
  const user = _id._id
  const use = _id
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    axios.get(`/user/${user}`) //slash users slash achievements refactor
    .then((userArray) => {
    setActiveUser(userArray[0]);
    setCoinsEarned(userArray.data[0].coinCount)
    const thriftyCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Thrifty') {
      return true
      }
    })
    const superSaverCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Super Saver') {
      return true
      }
    })
    const moneyBagsCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Money Bags') {
      return true
      }
    })
    const quizzicalCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Quizzical') {
      return true
      }
    })
    const quizGod =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Quiz God') {
      return true
      }
    })
    if (userArray.data[0].coinCount >= 10 && thriftyCheck === -1) {
      axios.put(`/user/achievements/${userArray.data[0]._id}`, {
        name: 'Thrifty',
        image: "https://www.trueachievements.com/imagestore/0007101900/7101902.jpg"
      })
    }
    if (userArray.data[0].coinCount >= 30 && superSaverCheck === -1) {
          axios.put(`/user/achievements/${userArray.data[0]._id}`, {
            name: 'Super Saver',
            image: 'https://www.trueachievements.com/imagestore/0006900900/6900915.jpg'
          })
        }
    if (userArray.data[0].coinCount >= 50 && moneyBagsCheck === -1) {
      axios.put(`/user/achievements/${userArray.data[0]._id}`, {
        name: 'Money Bags',
        image: 'https://www.trueachievements.com/imagestore/0006900800/6900859.jpg'
      })
    }
    if (userArray.data[0].questionCount >= 20 && quizzicalCheck === -1) {
      axios.put(`/user/achievements/${userArray.data[0]._id}`, {
        name: 'Quizzical',
        image: 'https://www.trueachievements.com/imagestore/0007044300/7044323.jpg'
      })
    }
    if (userArray.data[0].questionCount >= 50 && quizGod === -1) {
      axios.put(`/user/achievements/${userArray.data[0]._id}`, {
        name: 'Quiz God',
        image: 'https://www.trueachievements.com/imagestore/0007044300/7044303.jpg'
      })
    }
    axios.get(`/dog/users/${user}`) //slash users slash achievements refactor
  .then((dogArray) => {
  //bypasses error on first render
  if (use._id) {
  const hasOneDog = userArray.data[0].achievements.findIndex((item) => {
    if (item.name === 'Good Puppy') {
    return true
    }
  })
  const hasTwoDogs = userArray.data[0].achievements.findIndex((item) => {
    if (item.name === 'Pair of Pups') {
    return true
    }
  })
  const hasThreeDogs = userArray.data[0].achievements.findIndex((item) => {
    if (item.name === 'Dog Pile!') {
    return true
    }
  })
  if (dogArray.data.dogsArr[0].owner === use._id && hasOneDog === -1) {
    axios.put(`/user/achievements/${use._id}`, {
      name: 'Good Puppy',
      image: 'https://www.trueachievements.com/imagestore/0006879400/6879454.jpg'
    })
  }
  if (dogArray.data.dogsArr.length >= 2 && hasTwoDogs === -1) {
    axios.put(`/user/achievements/${use._id}`, {
      name: 'Pair of Pups',
      image: 'https://www.trueachievements.com/imagestore/0006917800/6917875.jpg'
    })
  }
  if (dogArray.data.dogsArr.length >= 3 && hasThreeDogs === -1) {
    axios.put(`/user/achievements/${use._id}`, {
      name: 'Dog Pile!',
      image: 'https://www.trueachievements.com/imagestore/0006917800/6917800.jpg'
    })
  }
  axios.get(`/user/${user}`) //slash users slash achievements refactor
    .then((userArray) => {
    setAchievementsEarned(userArray.data[0].achievements)
  })
}
})
.catch((err) => {
  console.error( err)
})

})
}, [activeUser])


  return (
  <div className="achievement-container">
    <div className="user-achievements">
      <p className="achievement-header">ACHIEVEMENTS EARNED</p>
      <div>
        {achievementsEarned.map((achievement) => (
          <Achieve 
          achieve={achievement.name}
          key={achievement._id}
          img={achievement.image}
          // possibly update with a unique key  instead of achievement
          // view={achievementsEarned}
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Achievements;
