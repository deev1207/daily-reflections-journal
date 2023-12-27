import { initializeApp } from "firebase/app";
import { getDatabase,  ref, set , onValue, push, update, remove} from "firebase/database";

const firebaseConfig =JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export function writeUserData(res) {
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, res);
  }

export async function updateData(key, data){
  const updates = {};
  // const postData = {response: data}
  updates['/posts/' + key] = data;
  await update(ref(db), updates)
  const res = await fetchData()
  return new Promise(resolve=>resolve(res))
}

export function deleteData(key){
  const postListRef = ref(db,'posts/'+key)
  return remove(postListRef)
}
export async function fetchData(){
  return new Promise((resolve)=>{
    onValue(ref(db, '/posts/'), (snapshot) => {
      const data = snapshot.val()
      resolve(data)
      // ...
    });
  })
  }


