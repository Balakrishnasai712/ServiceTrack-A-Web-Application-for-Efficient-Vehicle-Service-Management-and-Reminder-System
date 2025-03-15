import Service from '../models/service.js';
import Vehicle from '../models/vehicle.js';

// @desc    Add a new service
// @route   POST /api/services
// @access  Protected
export const addService = async (req, res) => {
    const { vehicleId, serviceType, serviceDate, cost, notes } = req.body;

    if (!vehicleId || !serviceType || !serviceDate) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    try {
        const service = await Service.create({
            vehicleId,
            serviceType,
            serviceDate,
            cost,
            notes
        });

        // Auto-update lastServiceDate in Vehicle model
        await Vehicle.findByIdAndUpdate(vehicleId, { lastServiceDate: serviceDate });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add service.' });
    }
};

// @desc    Get all services for a vehicle
// @route   GET /api/services/:vehicleId
// @access  Protected
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({ vehicleId: req.params.vehicleId });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve services.' });
    }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Protected
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        await service.deleteOne();
        res.status(200).json({ message: 'Service deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete service.' });
    }
};
