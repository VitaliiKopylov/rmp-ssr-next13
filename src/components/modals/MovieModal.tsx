'use client';

import BaseModal from '../BaseModal';
import MovieForm from '../MovieForm';
import { IMovieDetails } from '../../types';
import { useRouter } from 'next/navigation';

interface IMovieModal {
  formData?: IMovieDetails;
  link: string;
  formType: 'add' | 'edit';
}

const MovieModal = ({ formData, link, formType }: IMovieModal) => {
  const router = useRouter();

  return (
    <BaseModal handleClose={() => router.push(link)} title={`${formType} Movie`}>
      <MovieForm initialFormData={formData} formType={formType} />
    </BaseModal>
  );
};

export default MovieModal;
