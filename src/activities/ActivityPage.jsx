import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivities, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivity() {
      if (!activityId) return;

      try {
        const activities = await getActivities();
        const found = activities.find(
          (a) => String(a.id) === String(activityId)
        );

        if (!found) {
          throw new Error("Activity not found.");
        }

        setActivity(found);
      } catch (e) {
        setError(e.message);
      }
    }

    loadActivity();
  }, [activityId]);

  const handleDelete = async () => {
    try {
      await deleteActivity(token, activity.id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!activityId) return <p>No activity selected.</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && <button onClick={handleDelete}>Delete</button>}
    </>
  );
}