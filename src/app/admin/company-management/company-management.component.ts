import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AdminCompanyDto } from '../../models/company/AdminCompanyDto';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css'],
  standalone: false
})
export class CompanyManagementComponent {
    companiesPENDING: AdminCompanyDto[] = [];
    companiesAPPROVED: AdminCompanyDto[] = [];
    companiesREJECTED: AdminCompanyDto[] = [];
    loading: boolean = false;

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.loadCompanies();
    }

    loadCompanies(): void {
        this.loading = true;
        this.adminService.getAllCompanies().subscribe({
            next: (companies) => {
                this.companiesPENDING = companies.filter(c => c.status === "PENDING");
                this.companiesAPPROVED = companies.filter(c => c.status === "APPROVED");
                this.companiesREJECTED = companies.filter(c => c.status === "REJECTED");
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading companies:', error);
                this.loading = false;
            }
        });
    }

    approveCompany(companyId: number): void {
        this.adminService.approveCompany(companyId).subscribe({
            next: () => this.loadCompanies(),
            error: (error) => console.error('Error approving company:', error)
        });
    }

    rejectCompany(companyId: number): void {
        this.adminService.rejectCompany(companyId).subscribe({
            next: () => this.loadCompanies(),
            error: (error) => console.error('Error rejecting company:', error)
        });
    }

    downloadFile(base64String: string, fileName: string): void {
        try {
            if (!base64String) {
                console.error('No file data available');
                return;
            }

            // Extract mime type and data from base64 string
            const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            const mimeType = matches?.[1] || this.detectMimeType(base64String);
            const base64Data = matches?.[2] || base64String;

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType || 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName || 'company_document';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    private detectMimeType(base64: string): string {
        // Check for common file signatures
        if (base64.startsWith('/9j/') || base64.startsWith('iVBORw')) {
            return 'image/jpeg';
        } else if (base64.startsWith('JVBERi0')) {
            return 'application/pdf';
        } else if (base64.startsWith('UEsDBBQ')) {
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }
        return 'application/octet-stream';
    }
}