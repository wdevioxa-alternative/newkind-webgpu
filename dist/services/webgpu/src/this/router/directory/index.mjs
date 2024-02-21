<<<<<<< HEAD
import { сonfigRouter } from '../index.mjs';
import { multiaddr } from '../../mjs/index.mjs';

export const directory = async (self, props) => {
    const {
        location,
        value
    } = props;

    const ADDRESS = multiaddr(location.pathname).nodeAddress({
        value: !!value ? value : false,
        type: 'mss'
    });

    const result = сonfigRouter.get().find(item => item.value === ADDRESS.value);
    ADDRESS.isRouter = !!result;

    return Object.assign(ADDRESS, result);

=======
import { сonfigRouter } from '../index.mjs';
import { multiaddr } from '../../mjs/index.mjs';

export const directory = async (self, props) => {
    const {
        location,
        value
    } = props;

    const ADDRESS = multiaddr(location.pathname).nodeAddress({
        value: !!value ? value : false,
        type: 'mss'
    });

    const result = сonfigRouter.get().find(item => item.value === ADDRESS.value);
    ADDRESS.isRouter = !!result;

    return Object.assign(ADDRESS, result);

>>>>>>> 01ce6be67cb59e817833882aafe2b0471ee77a58
};