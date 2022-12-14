package org.utl.dsm.optik.model;

public class VentaPresupuesto {

    private Venta venta;
    private Presupuesto presupuesto;
    private int cantidad;
    private double precioUnitario;
    private double descuento;

    public VentaPresupuesto() {
    }

    public VentaPresupuesto(Venta venta, Presupuesto presupuesto, int cantidad, double precioUnitario, double descuento) {
        this.venta = venta;
        this.presupuesto = presupuesto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    @Override
    public String toString() {
        return "VentaPresupuesto{" +
                "venta=" + venta.toString() +
                ", presupuesto=" + presupuesto.toString() +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                ", descuento=" + descuento +
                '}';
    }
}
