import { Controller, Post, Get, Put, Delete, Res, HttpStatus ,Body, Param, NotFoundException, Query} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDTO } from 'src/dto/proveedor.dto';
import { async } from 'rxjs';
import { json } from 'express';


@Controller('proveedor')
export class ProveedorController {

    constructor(private proveedorService: ProveedorService){

    }

    @Post('/create')
    async createPost(@Res()res, @Body() createProveedorDTO: CreateProveedorDTO){
        const proveedor = await this.proveedorService.createProveedor(createProveedorDTO);
        return res.status(HttpStatus.OK).json({
            message: 'provider created',
            proveedor
        });

        }
     
    @Get ('/')
    async getProveedores(@Res() res){
        const proveedores = await this.proveedorService.getProveedores();
        res.status(HttpStatus.OK).json({
            proveedores
        });

    }

    @Get('/proveedorID')
    async getProveeedor(@Res() res, @Param('proveedorID')proveedorID){
        const proveedor = await this.proveedorService.getProveedor(proveedorID);
        if(!proveedor) throw new NotFoundException ('Provider does not exits');
        return res.status(HttpStatus.OK).json(proveedor);
    }

    @Delete('/delete')
    async deleteProveedor(@Res()res, @Param('proveedorID')proveedorID){
        const proveedorDelete = await  this.proveedorService.deleteProveedor(proveedorID);
        if(!proveedorID) throw new NotFoundException('Provider does not exits');
        return res.status(HttpStatus.OK).json({
            message: 'Provider deleted succesfully',
            proveedorDelete
        });
    }

    @Put('/update')
    async updateProveedor(@Res() res, @Body() createProveedorDTO: CreateProveedorDTO, @Query('proveedorID')proveedorID)
    {
        const updateProveedor = await this.proveedorService.updateProveedor(proveedorID, createProveedorDTO);
        if(!updateProveedor) throw new NotFoundException('Provider does not exits');
        return res.status(HttpStatus.OK).json({
            message: 'Provider update succefylly',
            updateProveedor
        });
    }
}
