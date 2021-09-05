import React, { useContext } from 'react';
import {
    Box,
    CircularProgress,
    Text,
    VStack
} from '@chakra-ui/react';
import { starWarsScrollBG } from '../../styles';
import { AppContext } from '../../core/app-context';


interface IProps {
    route: string | null;
}

export default function NotFound({ route }: IProps) {

    const [appState, dispatch] = useContext(AppContext);

    return (
        <Box {...starWarsScrollBG}>
            <VStack>
                {
                    appState.loading || route === null
                        ? <VStack
                            justifyContent="center"
                            py={12}
                        >
                            <CircularProgress
                                isIndeterminate
                                size="60px"
                                trackColor="transparent"
                                color="#ffc909"
                            />
                        </VStack>
                        : <Box>
                            <Text>
                                Page Not Found
                            </Text>
                        </Box>
                }
            </VStack>
        </Box>
    );
}
