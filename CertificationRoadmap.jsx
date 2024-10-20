import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This is a simplified version of the certification data
const certifications = [
  { id: 'CISSP', name: 'CISSP', domain: 'Security and Risk Management', level: 'Advanced' },
  { id: 'CEH', name: 'CEH', domain: 'Security Operations', level: 'Intermediate' },
  // Add more certifications here...
];

export default function CertificationRoadmap() {
  const [filter, setFilter] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts = certifications.filter(cert => 
    cert.name.toLowerCase().includes(filter.toLowerCase()) ||
    cert.domain.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Security Certification Roadmap</h1>
      <div className="mb-4">
        <Input 
          placeholder="Filter certifications" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map(cert => (
          <Card key={cert.id} className="cursor-pointer" onClick={() => setSelectedCert(cert)}>
            <CardHeader>
              <CardTitle>{cert.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Domain: {cert.domain}</p>
              <p>Level: {cert.level}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedCert && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selectedCert.name} Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Domain: {selectedCert.domain}</p>
            <p>Level: {selectedCert.level}</p>
            {/* Add more details here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}