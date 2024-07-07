import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { HomePage } from './home.page'
import { AssetService } from '../shared/services/asset.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { of, throwError } from 'rxjs'

describe('HomePage', () => {
  let component: HomePage
  let fixture: ComponentFixture<HomePage>
  let mockAssetService: jasmine.SpyObj<AssetService>
  const mockData: Asset[] = [{
    id: 'e7833d96',
    type: 'Forklift',
    name: 'Forklift FL-1',
    locationId: 'AAL',
    locationName: 'Aalborg warehouse',
    image: '',
  }, {
    id: 'ca87b865653f',
    type: 'Forklift',
    name: 'Forklift FL-2',
    locationId: 'AAL',
    locationName: 'Aalborg warehouse',
    image: 'https://cdn.pixabay.com/photo/2012/11/30/14/20/fork-68042_960_720.jpg',
  }, {
    id: '6f318992',
    type: 'Car',
    name: 'Skoda Octavia',
    locationId: 'CPH-01',
    locationName: 'Copenhagen office',
    image: 'https://cdn.pixabay.com/photo/2018/03/28/17/42/skoda-octavia-3269945_960_720.png',
  }, {
    id: '87997b682313',
    type: 'Car',
    name: 'Audi A4',
    locationId: 'CPH-01',
    locationName: 'Copenhagen office',
    image: '',
  }, {
    id: 'dde101b1',
    type: 'Air compressor',
    name: 'COM-001 Air Compressor',
    locationId: 'CPH-03',
    locationName: 'Production line',
    image: '',
  }, {
    id: '31a92936eed7',
    type: 'Motor-DC',
    name: 'DCM-201 Motor for EX-201',
    locationId: 'CPH-03',
    locationName: 'Production line',
    image: '',
  }]

  beforeEach(waitForAsync(async () => {
    mockAssetService = jasmine.createSpyObj('AssetService', ['getAll'])

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AssetService, useValue: mockAssetService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HomePage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set isLoading to true and call getAll on ionViewWillEnter', () => {
    mockAssetService.getAll.and.returnValue(of())
    
    component.ionViewWillEnter()

    expect(component.isLoading).toBeTrue()
    expect(mockAssetService.getAll).toHaveBeenCalled()
  })

  it('should set assets and isLoading to false on successful getAll', () => {
    // @ts-ignore
      mockAssetService.getAll.and.returnValue(of({ data: mockData}))

      component.ionViewWillEnter()
      fixture.detectChanges() 

      expect(component.assets).toEqual(mockData)
      expect(component.isLoading).toBeFalse()
  })

  it('should call ionViewWillEnter with error', () => {
    mockAssetService.getAll.and.returnValue(throwError("Http error"))

    component.ionViewWillEnter()
    fixture.detectChanges()

    expect(component.assets).toEqual([])
    expect(component.isLoading).toBeFalse()
  })

  it('should call retryAction', () => {
    // @ts-ignore
    mockAssetService.getAll.and.returnValue(of({data: mockData}))
    component.retryAction()
    expect(component.isLoading).toBeFalse()
  })

  it('should call cancelAction', () => {
    component.cancelAction()
    expect(component.isLoading).toBeFalse()
  })
})