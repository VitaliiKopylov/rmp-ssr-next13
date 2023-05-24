import dynamic from "next/dynamic";

const MovieModal = dynamic(() => import("@/components/modals/MovieModal"), {ssr: false})

const AddMoviePage = () => (<MovieModal link='/' formType="add" />);

export default AddMoviePage;
