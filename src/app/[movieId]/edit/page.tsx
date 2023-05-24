import dynamic from "next/dynamic";
const MovieModal = dynamic(() => import("@/components/modals/MovieModal"), {ssr: false})
import { API_URL } from '@/constants';

interface IPageProps {
  params: {
    movieId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchData(movieId: string) {
  try {
    const result = await fetch(`${API_URL}/movies/${movieId}`);
    const data = await result.json();
    return data;
  } catch (err) {
    return {};
  }
}

const EditPage = async ({ searchParams, params }: IPageProps) => {
  const movie = await fetchData(params.movieId);

  return <MovieModal link="/" formType="edit" formData={movie} />;
};

export default EditPage;
