/**
 * Provide configuration settings
 */
import React, { createContext, useReducer } from "react";

import config, { Config } from "../server/config";

// const ConfigContext = createContext<any>(config);
const ConfigContext = React.createContext<Config | undefined>(undefined);

// export const StateProvider = (props: any) => {
//     const [state, dispatch] = useReducer(configReducer, config ?? {app: false});

//     return (
//         <ConfigContext.Provider value={[state, dispatch]}>
//             {props.children}
//         </ConfigContext.Provider>
//     );
// }

export default ConfigContext;
