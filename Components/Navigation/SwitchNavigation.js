import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Configure from '../../Configure';

const SwitchNavigation =
  createSwitchNavigator(
    {
      connect: Configure,
    },
    {
      initialRouteName: 'connect',
    }
  );

export default createAppContainer(SwitchNavigation);
