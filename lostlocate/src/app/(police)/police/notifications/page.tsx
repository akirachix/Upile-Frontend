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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({});

  const openModal = (notification: Matches) => {
    setSelectedNotification(notification);
    setModalOpen(true);

    setReadStatus((prevStatus) => ({
      ...prevStatus,
      [notification.missing_person.created_at]: true,
    }));
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="ml-[350px] min-h-screen bg-white py-8">
        <div className="container mx-auto">
          <h1 className="text-[40px] font-bold text-[#662113] mb-6 text-center">
            Match Notifications
          </h1>
          <div className="grid gap-4">
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() => openModal(notification)}
                  className={`cursor-pointer flex items-center p-4 border border-gray-300 rounded-lg ${
                    readStatus[notification.missing_person.created_at]
                      ? "bg-gray-200"
                      : "bg-[#f9f9f9] font-bold"
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
                      wearing {notification.missing_person.clothes_worn}, may correspond to an unidentified body recorded as a {notification.unidentified_body.gender} found at {" "} 
                      {notification.unidentified_body.location}, which was reported on {notification.unidentified_body.reporting_date} {" "} 
                      wearing {notification.unidentified_body.clothes_worn}. Please review the details for further action.
                    </p>
                    <p className="text-[#662113] mt-[24px] ml-[80%] text-sm">
                      Notification created at: {new Date(notification.unidentified_body.created_at).toLocaleString()}
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

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 mx-1 rounded-lg ${
                    currentPage === i + 1 ? "bg-[#662113] text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-[24px] text-[#662113] font-bold">Notification Details</h2>
            <br />
            <h2 className="text-[20px] text-[#662113] font-bold">Missing Person</h2>
            <p>
              Missing Person: {selectedNotification.missing_person.first_name}{" "}
              {selectedNotification.missing_person.last_name}
            </p>
            <p>Gender: {selectedNotification.missing_person.gender}</p>
            <p>Location: {selectedNotification.missing_person.location}</p>
            <p>Date Missing: {selectedNotification.missing_person.missing_date}</p>
            <p>Clothes Worn: {selectedNotification.missing_person.clothes_worn}</p>
            <br />
            <h2 className="text-[20px] text-[#662113] font-bold">Unidentified Body</h2>
            <p>
              Unidentified Body Found at:{" "}
              {selectedNotification.unidentified_body.location}
            </p>
            <p>
              Name: {selectedNotification.unidentified_body.name}
            </p>
            <p>
              Gender: {selectedNotification.unidentified_body.gender}
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
