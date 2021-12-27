import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    REESTABLECER_TAREAS
} from "../../types";

import clienteAxios from "../../config/axios";

const TareaState = (props) => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
    };

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTareas = async (proyecto) => {
        try {
            const resultado = await clienteAxios.get("/api/tareas", {
                params: { proyecto },
            });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas.reverse(),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const agregarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.post("/api/tareas", tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        });
    };

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {
                params: { proyecto },
            });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const actualizarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.put(
                `/api/tareas/${tarea._id}`,
                tarea
            );
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea,
        });
    };

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA,
        });
    };
    const reestablecerTareas = () => {
        dispatch({
            type: REESTABLECER_TAREAS,
            payload: initialState,
        });
    };

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                reestablecerTareas,
            }}
        >
            {props.children}
        </tareaContext.Provider>
    );
};

export default TareaState;
