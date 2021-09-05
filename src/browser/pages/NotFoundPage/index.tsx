import React, { useContext } from 'react';
import {
    Box,
    CircularProgress,
    Text,
    VStack
} from '@chakra-ui/react';
import { starWarsScrollBG } from 'src/browser/styles';
import { AppContext } from 'src/browser/core/app-context';


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
                        ? <Box>
                            <CircularProgress
                                isIndeterminate
                                size={30}
                                trackColor="transparent"
                                color="#ffc909"
                            />
                        </Box>
                        : <Box>
                            <Text>
                                Page Not Foundling
                            </Text>
                        </Box>
                }
            </VStack>
        </Box>
    );
}
