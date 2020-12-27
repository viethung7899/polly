import { useHistory } from "react-router-dom";

import Banner from '../components/Banner';
import Button from '../components/Button';


const NotFound = () => {
  const history = useHistory();
  return (
    <Banner title="You're lost..." type="is-fullheight-with-navbar">
      <Button
        title="Let's go home"
        type="is-white is-outlined is-medium"
        icon="fas fa-home"
        action={() => history.push('/')}
      ></Button>
    </Banner>
  );
};

export default NotFound;
