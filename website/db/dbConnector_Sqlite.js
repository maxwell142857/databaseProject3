const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const { createClient } = require("redis");

let redisClient = null;
async function connect() {
  return open({
    // filename: "./db/bikeShare.sqlite3",
    filename: "./db/project3.db",
    driver: sqlite3.Database,
  });
}

async function getTrips() {
  const db = await connect();
  try {
    const trips = await db.all(`SELECT ride_id, 
      start_station_name, 
      end_station_name, 
      started_at, 
      ended_at,
      rideable_type
    FROM  trips
    ORDER BY ride_id DESC
    LIMIT 20;
    `);

    console.log("dbConnector got data", trips.length);

    return trips;
  } finally {
    await db.close();
  }
}

async function getTrip(ride_id) {
  console.log("Get trip ride_id", ride_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT 
    ride_id, 
    start_station_name, 
    end_station_name, 
    started_at, 
    ended_at,
    rideable_type
  FROM trips
  WHERE 
    ride_id = :ride_id    
  `);

    stmt.bind({ ":ride_id": ride_id });

    const trips = await stmt.all();

    await stmt.finalize();

    return trips;
  } finally {
    await db.close();
  }
}

async function updateTrip(ride_id, newRide) {
  console.log("update trip ride_id", ride_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`UPDATE trips  
    SET
      start_station_name = :start_station_name,
      end_station_name = :end_station_name, 
      started_at = :started_at, 
      ended_at = :ended_at,
      rideable_type = :rideable_type
  WHERE 
    ride_id = :ride_id    
  `);

    stmt.bind({
      ":ride_id": ride_id,
      ":end_station_name": newRide.end_station_name,
      ":start_station_name": newRide.start_station_name,
      ":started_at": newRide.started_at,
      ":ended_at": newRide.ended_at,
      ":rideable_type": newRide.rideable_type,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function deleteTrip(ride_id) {
  console.log("update trip ride_id", ride_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`DELETE FROM trips      
  WHERE 
    ride_id = :ride_id    
  `);

    stmt.bind({
      ":ride_id": ride_id,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function createTrip( newRide) {
  console.log("create trip newRide", newRide);
  const db = await connect();
  try {
    const stmt = await db.prepare(`INSERT INTO trips 
      (start_station_name, end_station_name, started_at, ended_at, rideable_type)
    VALUES
      ( 
        :start_station_name,
        :end_station_name, 
        :started_at, 
        :ended_at,
        :rideable_type
      )
  `);

    stmt.bind({
      ":end_station_name": newRide.end_station_name,
      ":start_station_name": newRide.start_station_name,
      ":started_at": newRide.started_at,
      ":ended_at": newRide.ended_at,
      ":rideable_type": newRide.rideable_type,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}


// ******* COMMENTS *********

async function getComment(comment_id) {
  console.log("Get comment comment_id", comment_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT 
    ride_id,
    comment_id,
    comment 
  FROM comments
  WHERE 
    comment_id = :comment_id    
  `);

    stmt.bind({ ":comment_id": comment_id });

    const comments = await stmt.all();

    await stmt.finalize();

    return comments;
  } finally {
    await db.close();
  }
}

async function getComments(ride_id) {
  console.log("Get comments for ride_id", ride_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT 
    ride_id,
    comment_id,
    comment 
  FROM comments
  WHERE 
    ride_id = :ride_id    
  `);

    stmt.bind({ ":ride_id": ride_id });

    const comments = await stmt.all();

    await stmt.finalize();

    return comments;
  } finally {
    await db.close();
  }
}

// Update one comment
async function updateComment(comment_id, newComment) {
  console.log("update comment comment_id", comment_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`UPDATE comments  
    SET
      comment = :comment
  WHERE 
    comment_id = :comment_id    
  `);

    stmt.bind({
      ":comment_id": comment_id,
      ":comment": newComment.comment,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

// Delete one comment
async function deleteComment(comment_id) {
  console.log("Delete comment comment_id", comment_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`DELETE FROM comments  
  WHERE 
    comment_id = :comment_id    
  `);

    stmt.bind({
      ":comment_id": comment_id,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}


async function createComment( newComment) {
  console.log("create comment newComment", newComment);
  const db = await connect();
  try {
    const stmt = await db.prepare(`INSERT INTO comments 
      (ride_id, comment)
    VALUES
      ( 
        :ride_id,
        :comment
      )
  `);

    stmt.bind({
      ":ride_id": newComment.ride_id,
      ":comment": newComment.comment
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}


async function getTitles() {
  const db = await connect();
  try {
    const titles = await db.all(`select * from Title
    `);

    return titles;
  } finally {
    await db.close();
  }
}

async function getTitle(titleID) {
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT * FROM Title WHERE titleID = :titleID    
  `);

    stmt.bind({ ":titleID": titleID });

    const trips = await stmt.all();

    await stmt.finalize();

    return trips;
  } finally {
    await db.close();
  }
}

async function updateTitle(titleID, newTitle) {
  
  const db = await connect();
  try {
    const stmt = await db.prepare(`UPDATE Title  
    SET
      title = :title,
      author = :author, 
      genre = :genre
  WHERE 
    titleID = :titleID    
  `);

    stmt.bind({
      ":titleID": titleID,
      ":author": newTitle.author,
      ":title": newTitle.title,
      ":genre": newTitle.genre,
    });

    const result = await stmt.run();
    await stmt.finalize();
    return result;
    
  } finally {
    await db.close();
  }
}

async function deleteTitle(titleID) {
  const db = await connect();
  try {
    const stmt = await db.prepare(`DELETE FROM Title      
  WHERE 
    titleID = :titleID    
  `);

    stmt.bind({
      ":titleID": titleID,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function deleteCopy(titleID) {
  const db = await connect();
  try {
    const stmt = await db.prepare(`DELETE FROM Copy      
  WHERE 
    titleID = :titleID    
  `);

    stmt.bind({
      ":titleID": titleID,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function createTitle( newTitle) {
  const db = await connect();
  try {
    const stmt = await db.prepare(`INSERT INTO Title 
      (title, author, genre)
    VALUES
      ( 
        :title,
        :author, 
        :genre
      )
  `);

    stmt.bind({
      ":title": newTitle.title,
      ":author": newTitle.author,
      ":genre": newTitle.genre,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function getCopies(titleID) {
  const db = await connect();
  redisClient = await createClient().connect();
  const stmt = await db.prepare(`SELECT * FROM Copy WHERE titleID = :titleID `);

  stmt.bind({ ":titleID": titleID });
  const copies = await stmt.all();
  await stmt.finalize();
  await db.close();
  
  // check whether the Redis has the infromation, if not, update Redis
  const test = await redisClient.get("copy"+titleID);
  if (test === null) {
    console.log(copies)
    const copyIds = [];
    for (const copy of copies) {
      copyIds.push(copy.copyID);
    }
    console.log(copyIds)
    // create list of copyId in redis
    for (const copyId of copyIds) {
      await redisClient.LPUSH(`copies:${titleID}`, copyId.toString());
    }
    // create copyID-->hashtable(location,isCheckedOut) in redis
    copies.forEach((copy) => {
      const hashKey = `copy:${copy.copyID}`;
      const hashData = {
        location: copy.location,
        isCheckedOut: copy.isCheckedOut,
      };
      redisClient.HSET(hashKey, hashData, (hashError) => {
        if (hashError) {
          return callback(hashError);
        }
        console.log(`Hash created for copy ID ${copy.id} successfully.`);
      });
    });
      
  }
  return copies;
  
}

module.exports = {
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  createTrip,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  createComment,
  //
  getTitles,
  getTitle,
  updateTitle,
  deleteTitle,
  deleteCopy,
  createTitle,
  getCopies
}
