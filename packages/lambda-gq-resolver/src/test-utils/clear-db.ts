import AWS from 'aws-sdk';
import TEST_DB_CONFIG from './config';

const clearDb = async (): Promise<void> => {
  const dynamodb = new AWS.DynamoDB(TEST_DB_CONFIG);
  const tables = await dynamodb.listTables().promise();

  console.log('\nTest DB: Deleteing tables...');

  if (TEST_DB_CONFIG.region !== 'local') {
    console.log('WTF ARE YOU DOING!?');
  }
  const deleteTableFns = tables.TableNames.map((TableName) => async () => {
    console.log(`Deleting ${TableName}`);
    return dynamodb
      .deleteTable({
        TableName,
      })
      .promise();
  });
  // await deleteTableFns[0]();
  // const callFns = deleteTableFns.map((fn) => fn());
  // await callFns[0];
  // await deleteTableFns[0]();

  await Promise.all(deleteTableFns.map((fn) => fn()));
};

export default clearDb;
