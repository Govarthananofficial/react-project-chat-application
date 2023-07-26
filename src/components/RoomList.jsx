import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useChat } from '../context/ChatProvider';
import useChatActions from '../hooks/useChatActions';
import useDebounce from '../hooks/useDebounce';
import { Description } from '../styled/Description';

const RoomListContainer = styled.div`
    --space: 1em;
    --horizontal-space: 2vw;
    
    display: flex;
    flex-direction: column;
    width: 26%;
    height: 100%;
    padding-top: var(--vertical-padding);
    overflow: auto;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    background: var( --blue-gradient);
    color: #fff;
    
    & h3 {
        font-size: 1.2em;
        font-weight: 500;
        padding: 0.9em var(--horizontal-space);
    }

    @media (max-width: 820px) {
        position: absolute;
        opacity: ${ props => props.open ? '1' : '0'};
        pointer-events: ${ props => props.open ? 'null' : 'none'};
        right: 0;
        width: 100%;
        border-radius: 0;
        z-index: 1;
    }
`;

const RoomItem = styled.li`
    display: flex;
    gap: 1vw;
    width: 100%;
    flex: 1;
    padding: var(--space) var(--horizontal-space);
    list-style: none;
    background: ${ props => props.active ?  'var(--blue-active-color)' : 'transparent'};
    cursor: pointer;
    transition: all .05s;

    &:hover {
        background: var(--blue-active-color);
    }

    & img {
        height: 3vw;
        width: 3vw;
        border-radius: 20px;
        object-fit: cover;
    }

    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    & span {
        font-weight: 500;
        font-size: 0.8em;
    }
`;


// Static rooms in the chat
const rooms = [
    {
        id: 1,
        name: 'New Chat 💻',
        src: './rooms-images/logo-01-02-01-01.svg',
        description: 'Interactive AI Assistant - Expert Answers, Quick Assistance.'
    },
    {
        id: 2,
        name: 'Front-End Developer 💻',
        src: './rooms-images/front.jpeg',
        description: 'The front-end developer community is a collaborative group focused on creating engaging web experiences through user interface design and continuous learning..'
    },

    {
        id: 3,
        name: 'Back-End Developer 💻',
        src: './rooms-images/back.jpg',
        description: 'The Back-End Developer community is a group of software engineers specializing in server-side programming, collaborating to build and maintain the logic, databases, and infrastructure that power web applications and services..'
    },
    
    {
        id: 4,
        name: 'Testers 🍕',
        src: './rooms-images/tester.jpg',
        description: 'The Testers Developer community is a collaborative network of software testers and developers focused on sharing knowledge, best practices, and tools to improve software quality and development processes.'
    },

    {
        id: 5,
        name: 'Supportive Developers 📚',
        src: './rooms-images/supportive.jpg',
        description: 'A supportive developers community that fosters collaboration, knowledge-sharing, and encouragement for all members to grow and excel in their programming journey.'
    },

    {
        id: 6,
        name: 'UI Developers 🎬',
        src: './rooms-images/ui.jpg',
        description: 'A community of UI developers collaborating and sharing expertise in designing intuitive and user-friendly interfaces.'
    },

    {
        id: 7,
        name: 'API Developers 🙌',
        src: './rooms-images/api.jpg',
        description: ' API Developers Community: A vibrant network of software developers and engineers, collaborating to share insights, best practices, and innovations in API development.'
    },

    {
        id: 8,
        name: 'Full Stack Developers A',
        src: './rooms-images/full.jpg',
        description: 'A Full Stack Developers community is a gathering of software developers proficient in both front-end and back-end technologies, collaborating to share knowledge and best practices for building comprehensive web applications.'
    }
];

const RoomList = ({ query, isNavOpen, setIsNavOpen }) => {
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();
    const { currentRoom, setCurrentRoom, userName } = useChat();


    const filteredRooms = useMemo(() => {
        const filter = rooms.filter(room => {
            const includesCaseInsensitive  = {
                name: room.name.toLowerCase(),
                description: room.description.toLowerCase()
            };
    
            const { name, description } = includesCaseInsensitive;
    
            return name.includes(debouncedSearch.toLowerCase()) || description.includes(debouncedSearch.toLowerCase());
        });

        return filter;
    }, [debouncedSearch]);

    const handleRoomClick = (roomID) => {
        if(currentRoom?.id === roomID) {
            return;
        }

        const selectedRoom = rooms.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);

        joinRoom({ roomID, userName });

        setIsNavOpen(false);
    }
    

    return (
        <RoomListContainer open={ isNavOpen }>
            <h3>Community</h3>

            <ul>
                {   
                    
                    filteredRooms.map(room => {
                        const { id, name, src, description} = room;

                        return (
                            <RoomItem active={ currentRoom?.id === id } key={ id } onClick={ () => handleRoomClick(id) }>
                                <img alt='room-img' src={ src } />

                                <div>
                                    <span>{ name }</span>
                                    <Description color='rgba(254,254,254,0.5)' size='0.7em'>{ description }</Description>
                                </div>
                            </RoomItem>
                        );
                    })
                }
            </ul>
        </RoomListContainer>
    );
};

export default RoomList;