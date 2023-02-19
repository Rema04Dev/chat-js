import cn from 'classnames';
import {
    Col,
    ButtonGroup,
    Dropdown,
} from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../store/slices/channelsSlice';
import { showModal } from '../../store/slices/modalsSlice';
const Channels = () => {
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector(state => state.channels);
    const { t } = useTranslation();
    const renderChannels = () => {
        const elements = channels.map(({ id, name, removable }) => {
            const channelCSS = cn('btn', {
                'btn-secondary': id === currentChannelId,
                'btn-outline-secondary': id !== currentChannelId
            })

            if (!removable) {
                return <li key={id} className="nav-item w-100">
                    <button
                        onClick={() => dispatch(setCurrentChannelId(id))}
                        type="button"
                        className={`w-100 text-start rounded-0 ${channelCSS}`}>
                        <span className="me-1">#</span>{name}
                    </button>
                </li>
            }
            return <li key={id} className="nav-item w-100">
                <div role="group" className="d-flex dropdown btn-group">
                    <Dropdown as={ButtonGroup} className="w-100">
                        <button
                            onClick={() => dispatch(setCurrentChannelId(id))}
                            type="button"
                            className={`w-100 text-start rounded-0 ${channelCSS}`}>
                            <span className="me-1">#</span>{name}
                        </button>

                        <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: id }))}
                            >
                                {t('channels.rename')}
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => dispatch(showModal({ modalType: 'removing', channelId: id }))}
                            >
                                {t('channels.remove')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </li>
        })

        return elements;
    }

    return (
        <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>{t('channels.title')}</span>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                    <Plus onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))} />
                </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {renderChannels()}
            </ul>
        </Col>

    )
}

export default Channels;