import { useState } from 'react';
import Head from 'next/head';

const RewardCatalogue = () => {
  // Sample reward data
  const rewards = [
    {
      id: 1,
      title: 'Amazon Gift Card',
      points: 500,
      category: 'gift cards',
      image: '/images/amazon-gift-card.jpg',
      description: '$10 Amazon gift card for all your shopping needs.'
    },
    {
      id: 2,
      title: 'Starbucks Coffee',
      points: 250,
      category: 'food & drink',
      image: '/images/starbucks.jpg',
      description: 'Enjoy a free coffee at any Starbucks location.'
    },
    {
      id: 3,
      title: 'Movie Tickets',
      points: 600,
      category: 'entertainment',
      image: '/images/movie-tickets.jpg',
      description: 'Two tickets to your favorite cinema.'
    },
    {
      id: 4,
      title: 'Fitness Tracker',
      points: 1500,
      category: 'electronics',
      image: '/images/fitness-tracker.jpg',
      description: 'Track your steps and monitor your health.'
    },
    {
      id: 5,
      title: 'Uber Voucher',
      points: 400,
      category: 'gift cards',
      image: '/images/uber.jpg',
      description: '$15 credit for your next Uber ride.'
    },
    {
      id: 6,
      title: 'Online Course',
      points: 800,
      category: 'education',
      image: '/images/online-course.jpg',
      description: 'Access to a premium online course of your choice.'
    },
  ];

  const [filter, setFilter] = useState('all');
  const [userPoints, setUserPoints] = useState(1000); // Sample user points

  // Get unique categories for filter
  const categories = ['all', ...new Set(rewards.map(reward => reward.category))];

  // Filter rewards based on selected category
  const filteredRewards = filter === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Reward Catalogue</title>
        <meta name="description" content="Browse and redeem your rewards" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Reward Catalogue</h1>
        
        {/* User points display */}
        {/* <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Your Points:</p>
          <p className="text-2xl">{userPoints.toLocaleString()}</p>
        </div> */}
        
        {/* Filter controls */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full capitalize ${filter === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rewards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map(reward => (
            <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* In a real app, you would use next/image */}
                <img 
                  src={reward.image} 
                  alt={reward.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">{reward.points} points</span>
                  <button 
                    className={`px-4 py-2 rounded ${userPoints >= reward.points 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    disabled={userPoints < reward.points}
                  >
                    {userPoints >= reward.points ? 'Redeem' : 'Not enough points'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRewards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rewards found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RewardCatalogue;