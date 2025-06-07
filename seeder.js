const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Clear all users and events
const clearDatabase = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

// Generate users
const generateUsers = async () => {
  try {
    const users = [];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('secret123', salt);

    for (let i = 0; i < 5; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword // All users have the same password: secret123
      };
      users.push(user);
    }

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('Error generating users:', error);
    process.exit(1);
  }
};

// Generate events
const generateEvents = async (users) => {
  try {
    const events = [];

    for (let i = 0; i < 10; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const event = {
        title: faker.lorem.words({ min: 2, max: 5 }),
        location: faker.location.city(),
        date: faker.date.future(),
        description: faker.lorem.paragraph(),
        userId: users[randomUserIndex]._id
      };
      events.push(event);
    }

    const createdEvents = await Event.insertMany(events);
    console.log(`${createdEvents.length} events created`);
  } catch (error) {
    console.error('Error generating events:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    await clearDatabase();
    const users = await generateUsers();
    await generateEvents(users);
    
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder
seedData(); 