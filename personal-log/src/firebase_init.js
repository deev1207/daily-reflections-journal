import { initializeApp } from "firebase/app";
import { getDatabase,  ref, set , onValue, push, update, remove} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDVLQQumOLuRwbr77ueqDaGRsgTHEm-r3I",
    authDomain: "personal-log-f2bba.firebaseapp.com",
    databaseURL: "https://personal-log-f2bba-default-rtdb.firebaseio.com",
    projectId: "personal-log-f2bba",
    storageBucket: "personal-log-f2bba.appspot.com",
    messagingSenderId: "564733324660",
    appId: "1:564733324660:web:235cd7a275fd40cdaa5021",
  };

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


