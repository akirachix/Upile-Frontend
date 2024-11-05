
"use client";
import { useState } from "react";
import { useNotifications } from "@/app/hooks/useNotification";
import Layout from "../components/Layout";
import Image from "next/image";
import { Matches } from "@/app/utils/types";

const imageUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

const Notification: React.FC = () => {
  const { data: notifications, loading, error } = useNotifications();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Matches | null>(null);

  const openModal = (notification: Matches) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalOpen(false);
  };

  if (loading) {
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
          notification.date_reported === true &&
          notification.location === true &&
          notification.clothes_worn === true)
      );
    })
    .sort(
      (a, b) =>
        new Date(b.missing_person.created_at).getTime() -
        new Date(a.missing_person.created_at).getTime()
    );

  return (
    <Layout>
      <div className="ml-[350px] min-h-screen bg-white py-8">
        <div className="container mx-auto">
          <h1 className="text-[40px] font-bold text-[#662113] mb-6 text-center">
            Match Notifications
          </h1>
          <div className="grid gap-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() => openModal(notification)}
                  className={`cursor-pointer flex items-center p-4 border border-gray-300 rounded-lg bg-white ${
                    index === 0 ? "bg-[#f9f9f9]" : ""
                  }`}
                >
                  <div className="mr-4">
                    <Image
                      src={`${imageUrl}${notification.missing_person.image}`}
                      alt="image"
                      width={230}
                      height={50}
                      className="h-[150px] rounded object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800">
                    A potential match has been identified:{" "}
                    {notification.missing_person.first_name}{" "} 
                    {notification.missing_person.last_name} recorded as a {notification.missing_person.gender} from{" "} 
                    {notification.missing_person.location} who went missing on {notification.missing_person.missing_date} {" "} 
                    wearing a 
                    {notification.missing_person.clothes_worn}, may correspond to an unidentified body recorded as a {notification.unidentified_body.gender} found at {" "} 
                    {notification.unidentified_body.location}, which was reported on {notification.unidentified_body.reporting_date} {" "} 
                    wearing {notification.unidentified_body.clothes_worn}. Please review the details for further action.
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

      {/* Modal */}
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-[24px] text-[#662113] font-bold">Notification Details</h2>
            <br></br>

            <h2 className="text-[20px] text-[#662113] font-bold">Missing Person</h2>
            <p>
              Missing Person: {selectedNotification.missing_person.first_name}{" "}
              {selectedNotification.missing_person.last_name}
            </p>
            <p>Gender: {selectedNotification.missing_person.gender}</p>
            <p>Location: {selectedNotification.missing_person.location}</p>
            <p>Date Missing: {selectedNotification.missing_person.missing_date}</p>
            <p>Clothes Worn: {selectedNotification.missing_person.clothes_worn}</p>
            <p>
              <br></br>
              <h2 className="text-[20px] text-[#662113] font-bold">Unidentied Body</h2>
              Unidentified Body Found at:{" "}
              {selectedNotification.unidentified_body.location}
            </p>
            <p>
              Name:{" "}
              {selectedNotification.unidentified_body.name}
            </p>
            <p>
              Gender:{" "}
              {selectedNotification.unidentified_body.gender}
            </p>
            <p>
              Date Reported: {selectedNotification.unidentified_body.reporting_date}
            </p>
            <p>Clothes Worn: {selectedNotification.unidentified_body.clothes_worn}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-[#662213] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Notification;

