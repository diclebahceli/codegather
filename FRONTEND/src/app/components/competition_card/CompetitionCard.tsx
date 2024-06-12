"use client";
import {Competition} from "@/app/models/Competition";
import Card from "../card/Card";
import {useRouter} from "next/navigation";
import {StyleSheet, css} from "aphrodite";
import Link from "next/link";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  const router = useRouter();

  const styles = StyleSheet.create({
    hover: {
      transition: 'transform 0.2s ease-in-out',
      ':hover': {
        transform: 'scale(1.02)'
      }
    },
  })

  const handleDetailsClick = () => {
    router.push(`/pages/competitionDetail/${competition.id}`);
  };

  return (
    <Link href={`/pages/competitionDetail/${competition.id}`}
      className={`col-md-6 col-12 m-sm-3 my-3 text-decoration-none ${css(styles.hover)}`}
      style={{height: "12.5rem"}}>
      <Card>
        <div className="card-body d-flex flex-column bg-grey rounded rounded-3">
          <div className="card-title fw-bold fs-4 text-white text-truncate">
            {competition.title}
          </div>
          <div
            className="card-text mb-3 fs-5 text-wrap text-truncate text-white overflow-hidden text-break"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              lineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {competition.description}
          </div>
          <button
            className="btn btn-green  ms-auto mt-auto"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </Card>
    </Link>
  );
}
