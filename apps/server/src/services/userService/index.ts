import User from 'models/User';
import { UserType } from 'models/User/types';

export const getUsers = () => User.find();

export const addUser = (userData: UserType) => User.create(userData);
