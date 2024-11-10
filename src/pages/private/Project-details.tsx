import { LoaderFunctionArgs } from 'react-router-dom';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';

export const loadProjectsAndTechnos = async ({
  params,
}: LoaderFunctionArgs) => {
  const { data } = await axiosWithoutCSRFtoken.get(`/project/${params.id}`);

  const project = data.result;
  return project;
};

function ProjectDetails() {
  return <h1>ProjectDetails</h1>;
}
export default ProjectDetails;
