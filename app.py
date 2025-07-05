import dash
from dash import html, dcc
import pandas as pd
import plotly.express as px
import plotly.figure_factory as ff

# Cargar datos
df = pd.read_csv("dataset.csv")

# === FIGURAS ===
# Scatter Plot
scatter_fig = px.scatter(df, x='edad', y='salario_anual', color='genero',
                         title='Edad vs Salario Anual',
                         labels={'edad': 'Edad', 'salario_anual': 'Salario Anual'},
                         template='plotly_white',
                         height=300)

# Correlación
numeric_df = df.select_dtypes(include=['int64', 'float64'])
correlation = numeric_df.corr().round(2)
corr_fig = ff.create_annotated_heatmap(
    z=correlation.values,
    x=correlation.columns.tolist(),
    y=correlation.columns.tolist(),
    annotation_text=correlation.values.round(2).astype(str),
    colorscale='Viridis',
    showscale=True
)
corr_fig.update_layout(
    height=400,
    font=dict(size=10),
    margin=dict(l=40, r=40, t=50, b=50),
)

# Iniciar app
app = dash.Dash(__name__)
app.title = "Dashboard de Empleados"

# Layout
app.layout = html.Div([
    html.H1("📊 Dashboard de Bienestar y Productividad", className="title"),

    html.P("Este dashboard analiza datos de empleados: edad, salario, estrés, satisfacción, etc.", className="description"),
    html.P("Equipo: Juan Pérez, Ana Gómez, Luis Martínez", className="description"),

    html.Div(className="dashboard-row", children=[
        html.Div(className="card", children=[
            dcc.Graph(figure=scatter_fig, config={"displayModeBar": False})
        ]),
        html.Div(className="card", children=[
            dcc.Graph(figure=corr_fig, config={"displayModeBar": False})
        ]),
    ])
])
 
# Ejecutar servidor
if __name__ == "__main__":
    app.run(debug=True)
