import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import styles from "./HomePage.module.scss";
import LastNotesTable from "./LastNotesTable";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rightMenuWrapper}>
        <div className={styles.profileWrapper}>
          <img src="/profile.png" alt="defaultProfileImage" />
          <span>{user.username}</span>
        </div>
        <div className={styles.sectionsWrapper}>
          <div className={styles.section}>
            <div className={styles.left}>
              <img src="/home.png" alt="home" />
              <span>Home</span>
            </div>
            <img src="/arrow.png" alt="" />
          </div>
          <div className={styles.section}>
            <div className={styles.left}>
              <img src="/notes.png" alt="home" />
              <span>Notes</span>
            </div>
            <img src="/arrow.png" alt="" />
          </div>
        </div>
        <div className={styles.moreMin}>
          <span>More minutes?</span>
          <img src="/starY.png" alt="" />
        </div>
        <button className={styles.btn}>Log Out</button>
      </div>

      <div className={styles.leftWrapper}>
        <div className={styles.videoWrapper}>
          <h2>Youtube Videos To Notes</h2>
          <input type="text" />
          <button>Create</button>
          <img src="/customUpload.png" alt="" />
        </div>
        <LastNotesTable />
      </div>
    </div>
  );
};

export default HomePage;
