import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");

        // Servicio auth
        const result = await registerUser(
            data.email,
            data.password,
            data.displayName,
        );

        if (result.success) {
            // Actualiza zustand y redirige al inicio del dashboard
            setUser(result.user);
            navigate("/dashboard");
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Task Manager Pro
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Crea una cuenta para comenzar
                    </p>
                </div>

                {/* Error general */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Tu nombre y apellido"
                            {...register("displayName", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message:
                                        "El nombre debe tener al menos 3 caracteres",
                                },
                            })}
                        />
                        {errors.displayName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.displayName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="tu@email.com"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo inválido",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Botón enviar */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                {/* Enlace a login */}
                <p className="text-center mt-6 text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
