import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import axios from "axios";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiShare2,
  FiGlobe,
} from "react-icons/fi";
import shareIcon from "../../../public/share.svg";
import locationIcon from "../../../public/location.svg";
import pinIcon from "../../../public/pin.svg";
import calendarIcon from "../../../public/calendar.svg";
import timeIcon from "../../../public/time.svg";
import NotFound from "@/component/notFound";

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!eventId || typeof eventId !== "string") {
      setError("NO_ID");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}smartOffice/WebViewgetEventDetails`,
          {
            params: { eventId },
          }
        );

        setEventData(response?.data?.result?.[0], "res1");

        console.log(response?.data?.result?.[0]);

        // if (!response.data || !response.data.data) {
        //   setError("NOT_FOUND");
        //   return;
        // }

        // setEventData(response.data.data);
        // console.log(response,'res2')
      } catch (err) {
        console.error(err);
        setError("FAILED");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [router.isReady, eventId]);

  const handleShare = async () => {
    // const shareLink = eventData?.shareEventURL;
    const shareLink = `${window.location.origin}/shareEvent?eventId=${eventId}`;

    console.log(shareLink)

    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData?.eventName || "Event Details",
          text: "Check out this event!",
          url: shareLink,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      // Fallback for desktop browsers
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Sharing not supported on this browser.");
      }
    }
  };

  const formatDate = (start, end) => {
    if (!start || !end) return "";
    return `${new Date(start).toDateString()} - ${new Date(
      end
    ).toDateString()}`;
  };

  const formatTime = (start, end) => {
    if (!start || !end) return "";
    return `${new Date(start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  // Loading State
  if (loading) {
    return (
      <div className={styles.main}>
        <div className={styles.main_cover}>
          <div className={styles.content}>Loading...</div>
        </div>
      </div>
    );
  }

  // No Event ID
  if (error === "NO_ID") {
    return <NotFound />;
  }

  // Not Found
  if (error === "NOT_FOUND") {
    return <NotFound />;
  }

  // Failed
  if (error === "FAILED") {
    return <NotFound />;
  }

  if (!eventData) return <NotFound />;

  return (
    <div className={styles.main}>
      <div className={styles.main_cover}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Event</span>
          <Image
            src={shareIcon}
            alt="Share"
            onClick={handleShare}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className={styles.bannerWrapper}>
          <Image
            src={eventData?.eventImage || "/event-banner.png"}
            alt="Event Banner"
            width={375}
            height={240}
            className={styles.bannerImage}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.eventTitle}>{eventData.eventName}</h1>

          <p className={styles.eventDescription}>
            {eventData.eventDescription}
          </p>

          {eventData.eventLocation && (
            <div className={styles.infoItem}>
              <Image src={pinIcon} alt="" />
              <span>{eventData.eventLocation}</span>
              <Image src={locationIcon} alt="" />
            </div>
          )}

          {eventData.startDateTime && eventData.endDateTime && (
            <>
              <div className={styles.infoItem}>
                <Image src={calendarIcon} alt="" />
                <span>
                  {formatDate(eventData.startDateTime, eventData.endDateTime)}
                </span>
              </div>

              <div className={styles.infoItem}>
                <Image src={timeIcon} alt="" />
                <span>
                  {formatTime(eventData.startDateTime, eventData.endDateTime)}
                </span>
              </div>
            </>
          )}

          {eventData?.resource?.resourceName && (
            <>
              <div className={styles.sectionTitle}>Speaker</div>

              <div className={styles.speakerRow}>
                <Image
                  src={eventData?.resource?.resourceImageUrl || "/speaker.jpg"}
                  alt="Speaker"
                  width={50}
                  height={50}
                  className={styles.speakerImage}
                />
                <div className={styles.speakerName}>
                  {eventData?.resource?.resourceName}
                </div>
              </div>

              <p className={styles.speakerDesc}>
                {eventData?.resource?.resourceDescription}
              </p>

              {eventData.speakerLinkedIn && (
                <div className={styles.linkRow}>
                  <FiGlobe size={16} />
                  <a
                    href={eventData.speakerLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventData.speakerLinkedIn}
                  </a>
                </div>
              )}
            </>
          )}

          {eventData.attendType && (
            <>
              <div className={styles.sectionTitle}>Who can attend</div>
              <div className={styles.attendText}>{eventData.attendType}</div>
            </>
          )}
        </div>

        <div className={styles.bottomCTA}>
          {eventData.ctaText || "Join network to attend"}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
