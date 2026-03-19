export const ROW_CONFIG = [
  {
    title: "New on Netflix",
    fetcher: "discover",
    params: {
      with_watch_providers: 8,
      watch_region: "IN",
      sort_by: "primary_release_date.desc",
    },
  },
  {
    title: "Today's Top",
    fetcher: "trending",
    options: { timeWindow: "day" },
  },
  {
    title: "Top Rated",
    fetcher: "topRated",
  },
  {
    title: "Action",
    fetcher: "discover",
    params: { with_genres: 28 },
  },
  {
    title: "Popular",
    fetcher: "popular",
  },
];