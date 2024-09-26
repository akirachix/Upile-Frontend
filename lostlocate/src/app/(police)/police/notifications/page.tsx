"use client";
import { useNotifications } from "@/app/hooks/useNotification";
import Layout from "../components/Layout";
import Image from "next/image";

const imageUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
const Notification: React.FC = () => {
  const { data: notifications, isLoading, error } = useNotifications();

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error: {error.toString()}</div>;
  }

  const filteredNotifications = notifications
    .filter((notification) => {
      return (
        notification.name_match === false ||
        (notification.gender_match === true &&
          notification.clothes_worn === false)
      );
    })
    .sort(
      (a, b) =>
        new Date(b.missing_person.created_at).getTime() -
        new Date(a.missing_person.created_at).getTime()
    )
    .slice(0, 3);

  return (
    <Layout>
    <div className="ml-[100px] min-h-screen bg-white py-8">
      <div className="container mx-auto">
        <h1 className="text-[40px] font-bold text-[#662113] mb-6 text-center">
          Notifications
        </h1>
        <div className="grid gap-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div
                key={index}
                className={`flex items-center p-4 border border-gray-300 rounded-lg bg-white ${
                  index === 0 ? "bg-[#f9f9f9]" : ""
                }`}
              >
                <div className="mr-4">
                  <Image
                    src={`${imageUrl}${notification.missing_person.image}`}
                    alt="image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800">
                    A potential match has been identified:{" "}
                    {notification.missing_person.first_name}{" "}
                    {notification.missing_person.last_name} from{" "}
                    {notification.missing_person.location} may correspond to an
                    unidentified body. Please review the details in LostLocate
                    for further action.
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              There are no matching notifications.
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>

  );
};

export default Notification;
