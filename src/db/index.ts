import { connect } from 'mongoose';

const connectToDB = async () => {
  try {
    const _connect = await connect(process.env.CONNECTION_STRING as string);

    console.log(
      'DB Connected',
      _connect.connection.host,
      _connect.connection.name
    );
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

export default connectToDB;
